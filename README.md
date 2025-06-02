# Easy Redmine credentials and node for n8n

This repo contains n8n node for communication with Easy Redmine.

## How to install

### ⚙️ Requirements

To use our community node, you need to have the following requirements:

- n8n 1.54.4 or newer

### 🛠️ Installation in n8n

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) to install the Easy
Redmine node in n8n.

### 🔑 Setup credentials

You need to set up credentials for the Easy Redmine node.
You can do this by going to the credentials section in n8n and adding a new credential of type "Easy Redmine".

In the newly created credential, you need to fill in domain, and user api key.

The domain should be, for example, `https://instance.easyproject.com`.

To find the API key, go to your Easy Redmine instance, click on your profile in the top right corner.

![Go to profile](images/cred-guide-1.png)

Your profile window will open. Click on the "Edit" button.

![Profile window](images/cred-guide-2.png)

Your profile edit page will open. Scroll down to the Preferences section. Here just copy the API access key.

![Preferences section with API key](images/cred-guide-3.png)

Now, your credentials are ready to use.

## Easy Redmine node

The custom node is created to handle all aspects of Easy Redmine integration with n8n.
Currently available operations and resources are:

### Easy Redmine Entities

A list of all available entities in Easy Redmine node.

- Accounts
- Issues
- Leads
- Opportunities
- Personal contacts
- Users

### Accounts

Account entity is used to manage company contacts. It has identifier `easy_contacts`

**Operations**

- **Get one** - returns a detailed view of a single entity. The entity is specified by its ID.
- **Get many** - returns a list of entities. You should use easy query id to specify the filter.
- **Add comment** - adds a comment to the entity.
- **Create** - creates a new account.
  - Custom fields
  - Industry ID
  - Name (known as `firstname` in the entity schema)
  - Type ID
- **Update** - updates some fields of the entity.
  - Custom fields
  - Industry ID
  - Name (known as `firstname` in the entity schema)
  - Type ID

## Attendance

Attendance is used to track user attendance. The entity name is `easy_attendance`.

**Operations**

- **Get one** - returns a detailed view of a single attendance record. The entity is specified by its ID.
- **Get many** - returns a list of attendance records. You should use easy query id to specify the filter.
- **Create** - creates a new attendance record.
  - Arrival (required)
  - Departure
  - User ID
  - Description
  - Activity ID
- **Update** - updates some fields of the attendance record.
  - Arrival
  - Departure
  - User ID
  - Description
  - Activity ID

## Issues

Issues are mostly Redmine issues. The identifier is `issue`.

**Operations**

- **Get one** - returns a detailed view of a single entity. The entity is specified by its ID.
- **Get many** - returns a list of entities. You should use easy query id to specify the filter.
- **Add comment** - adds a comment to the entity.
- **Create** - creates a new issue.
  - Subject (required)
  - Project ID (required)
  - Assigned To ID
  - Custom fields
  - Description
  - Done Ratio
  - Due Date
  - Estimated Hours
  - Is Private
  - Parent Issue ID
  - Priority ID
  - Start Date
  - Status ID
  - Tracker ID
- **Update** - updates some fields of the entity.
  - Assigned To ID
  - Custom fields
  - Description
  - Done Ratio
  - Due Date
  - Estimated Hours
  - Is Private
  - Parent Issue ID
  - Priority ID
  - Project ID
  - Start Date
  - Subject
  - Tracker ID
  - Status ID

## Leads

Leads are CRM entities that refer to potential custom.
The identifier is `easy_lead`.

**Operations**

- **Get one** - returns a detailed view of a single lead. The entity is specified by its ID.
- **Get many** - returns a list of leads. You should use easy query id to specify the filter.
- **Add comment** - adds a comment to the lead.
- **Create** - creates a new lead.
  - Company Name
  - Description
  - Custom fields
- **Update** - updates some fields of the leads.
  - Company Name
  - Description
  - Custom fields

## Opportunities

Opportunities are CRM entities that represent a potential sale. The entity name is `easy_crm_case`.

**Operations**

- **Get one** - returns a detailed view of a single opportunity. The entity is specified by its ID.
- **Get many** - returns a list of entities. You should use easy query id to specify the filter.
- **Add comment** - adds a comment to the opportunity.
- **Create** - creates a new opportunity.
  - Name (required)
  - Project ID (required)
  - Account ID (required)
  - Custom fields
- **Update** - updates some fields of the opportunity.
  - Name
  - Description
  - Custom fields

## Personal contacts

Personal contacts are CRM entities that represent a person. The entity name is `easy_personal_contacts`.

**Operations**

- **Get one** - returns a detailed view of a single personal contact. The entity is specified by its ID.
- **Get many** - returns a list of entities. You should use easy query id to specify the filter.
- **Create** - creates a new personal contact.
  - Account ID (required or partner ID)
  - Partner ID (required or account ID)
  - First name (required)
  - Last name (required)
  - Email (required)
  - Job title
  - Custom fields
- **Update** - updates some fields of the personal contact.
  - Account ID
  - Partner ID
  - First name
  - Last name
  - Email
  - Job title
  - Custom fields

## Time entries

Time entries are used to track time spent on issues. The entity name is `time_entry`.

**Operations**

- **Get one** - returns a detailed view of a single time entry. The entity is specified by its ID.
- **Get many** - returns a list of time entries. You should use easy query id to specify the filter.
- **Create** - creates a new time entry.
  - Hours (required)
  - Activity ID
  - Comment
  - Project ID
  - Spent On
  - User ID
  - Custom Fields
- **Update** - updates some fields of the time entry.
  - Activity ID
  - Comment
  - Hours
  - Project ID
  - Spent On
  - User ID
  - Custom Fields

## Users

Users are Easy Redmine users. The entity name is `user`.

**Operations**

- **Get one** - returns a detailed view of a single user. The entity is specified by its ID.
- **Get many** - returns a list of entities. You should use easy query id to specify the filter.
- **Create** - creates a new user
  - Login (required)
  - First name (required)
  - Last name (required)
  - Email (required)
  - Phone
  - Custom fields
- **Update** - updates some fields of the user.
  - ID (required)
  - Login
  - First name
  - Last name
  - Email
  - Phone
  - Custom Fields
