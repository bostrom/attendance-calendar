# Attendance calendar

An embeddable attendance calendar for visualising personnel attendance
over time.

## Running

1. Run `bower install && npm install`
1. Install Docker and run the mongo container `docker run -P --name att-cal-db -d mongo`
1. Check which host `docker-machine ip default` and port `docker ps -a` the db is running on
1. Run `DB_HOST=dbhost DB_PORT=dbport node server.js` where `dbhost` and `dbport` are the host and port from previeous step

## Server API

All server api calls are published under the `/api` prefix. For example `/api/calendars`. The server accepts JSON and responds with JSON.

* [Calendars](#calendars)
* [Attendees](#attendees)
* [Attendances](#attendances)

### General response format

Single item responses are returned at the root of the response.

```json
{
  "_id": "5860ecad5a2e435e02edbe79",
  "name": "My calendar",
}
```

Lists are returned in a wrapper under the `data` property. The `meta` property contains metadata about the list (for paging etc).

```json
{
  "data": [
    {
      "_id": "5860ecad5a2e435e02edbe79",
      "name": "My calendar"
    }
  ],
  "meta": {
    "totalItems": 1
  }
}
```


### <a id="calendars"></a>Calendars

CRUD endpoint for calendars. A calendar has a name and a collection of attendees,
i.e. people who are participating in the calendar.

#### Model schema

* `name` (String) - the name of the calendar
* `attendees` (Array) - list of the attendees of the calendar. For POST/PUT this is the `_id`s of the `attendees`, in GET operations it contains the full `attendee` objects. (See [Attendees](#attendees))

```json
{
  "name": "My calendar",
  "attendees": []
}
```

#### Operations

* GET /calendars
* GET /calendars/{_id}
* POST /calendars
* PUT /calendars/{_id}
* DELETE /calendars/{_id}

*Example request body*

```json
{
  "name": "Fred's calendar",
  "attendees": ["5860ede05a2e435e02edbe7b", "5860edce5a2e435e02edbe7a"]
}
```

*Example response body*

```json
{
  "_id": "5860ecad5a2e435e02edbe79",
  "name": "Fred's calendar",
  "__v": 0,
  "attendees": [
    {
      "_id": "5860ede05a2e435e02edbe7b",
      "__v": 0,
      "attendances": [],
      "name": "John Doe"
    }
  ]
}
```

### <a id="attendees"></a>Attendees

An attendee is a person who participates in the attendance calendar.

#### Model schema

* `name` (String) - The name of the attendee
* `attendances` (Array) - A list of attendance statuses (present/absent) based on date for the attendee (see [Attendances](#attendances))

```json
{
  "name": "John Doe",
  "attendances": []
}
```

### Operations

* GET /attendees
* GET /attendees/{_id}
* POST /attendees
* PUT /attendees/{_id}
* DELETE /attendees/{_id}

*Example request body*

```json
{
  "name": "John Doe",
  "attendances": []
}
```

*Example response body*

```json
{
  "data": [
    {
      "_id": "5860edce5a2e435e02edbe7a",
      "__v": 0,
      "attendances": [],
      "name": "John Doe"
    },
  ],
  "meta": {
    "totalItems": 1
  }
}
```


### <a id="attendances"></a>Attendances

A single attendance record, containing date and status along with calendar id and attendee id.

#### Model schema

* `date` (Date) - The date of the attendance record
* `status` (String) - The attendance status (one of `absent`, `present`)
* `calendar` (String) - The id of the calendar this record belongs to
* `attendee` (String) - The id of the attendee this record belongs to

```json
{
  "calendar": "5860ecad5a2e435e02edbe79",
  "attendee": "5860edce5a2e435e02edbe7a",
  "status": "absent",
  "date": "2016-12-26T11:03:39.381Z"
}
```

#### Operations

* GET /attendances
* GET /attendances/{_id}
* POST /attendances
* PUT /attendances/{_id}
* DELETE /attendances/{_id}
* GET /attendances/search?queryKey=queryValue

*Example request body*

```json
{
  "date": "2016-12-26T11:03:39.381Z",
  "status": "absent",
  "attendee": "5860edce5a2e435e02edbe7a",
  "calendar": "5860ecad5a2e435e02edbe79"
}
```

*Example response body*

```json
{
  "data": [
    {
      "_id": "586104a34909f56c106bba79",
      "calendar": "5860ecad5a2e435e02edbe79",
      "attendee": "5860edce5a2e435e02edbe7a",
      "status": "absent",
      "__v": 0,
      "date": "2016-12-26T11:03:39.381Z"
    }
  ],
  "meta": {
    "totalItems": 1
  }
}
```

*Example search operation*

**Note**: All query parameters except those allowed by the API are filtered out. Allowed query parameters are

* `calendar` (calendarId)
* `attendee` (attendeeId)

```
GET /api/attendances/search?calendar=5860ecad5a2e435e02edbe79&attendee=5860edce5a2e435e02edbe7a
```


