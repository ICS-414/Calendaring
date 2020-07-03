# ICS414 Summer 2020 Calendar (.ics) team assignment

## Table of Contents
- [Description](Description)
- [User Stories](User-Stories)

---

### Description

Your team assignment is a variation on a commonly used tool: calendaring. This is not difficult, but requires attention to detail. You will work in teams.

Your system will generate event files – you are not building a system to read
event files. Unless you want to, of course. You can use an existing calendaring
system like Outlook, Google Calendar, or Mac OS Calendar to read files (that’s a good
way to test the output of your system). You are building a system to create .ics files
that can be emailed or shared, and read into the recipient’s calendars.

In particular, you shall implement a web app for an event planner. Event planners
typically have “several plates spinning” at a time (it’s a metaphor
https://www.youtube.com/watch?v=Zhoos1oY404), so your system must allow
events in various stages of development, as well as generating .ics files.

Required functionality. You must demonstrate the following are implemented:
- Version (section 3.7.4 of RFC 5545) 
- Classification (3.8.1.3). Note this is a way of users designating events as public (default), private, or confidential.
- Geographic Position (3.8.1.6)
- Location (3.8.1.7) Note the difference between geo position and location
- Priority (3.8.1.9)
- Summary (3.8.1.12) 
- DTSTART (3.8.2.4) 
- DTEND (3.8.2.2) 
- Time zone identifier (3.8.3.1)
- RSVP (3.2.17)
- Sent-by (3.2.18)
- Resources (3.8.1.10)
- And aspects (your choice) of recurring events (3.8.5). Recurring events (and exceptions to recurrences) can be very complicated. Start small and do what you can. For example, you might want to start with being able to schedule a meeting on the 25th of every month. Then add the ability to do exceptions, such as “except in December”).

---

### User Stories

1. As a student, I want to set time to study so I can hold myself accountable.
2. As a council member, I want to set a recurring event for weekly meetings.
3. As a teacher, I want to add notes to the event so I know what to talk about during the set meeting.
4. As a student, I want to set a location so I know where to meet my teammates. 

