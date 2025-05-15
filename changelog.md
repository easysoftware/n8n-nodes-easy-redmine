# 0.2.4 (Unreleased)

- Changed deprecated `this.helpers.requestWithAuthentication` to `this.helpers.httpRequestWithAuthentication`

# 0.2.3 (15.5.2025)

- Leads
  - Implemented `create` operation
- Personal contact
  - Implemented `create` and `add comment` operations
  - Fixes `Update` operation
- Issues
  - Implemented several new fields
- User
  - Implemented `create` operation
  - Added following fields to `update`:
    - Password
    - Must Change Password
    - Status

# 0.2.2 (7.5.2025)

- Implement basic `user` operations: read, read many, update
- You can update custom fields in:
  - accounts
  - issues
  - leads
  - opportunities
  - users
- Added create operation for `issues`.
