# Security Specification - Airframe Academy

## Data Invariants
1. **Feedback Integrity**: Feedback must include a valid category, rating (1-5), and a timestamp. Non-admins cannot read or modify existing feedback.
2. **User Progress Ownership**: A user can only read and write their own progress document.
3. **Curriculum Integrity**: Only authorized administrators can modify lessons and glossary terms. These materials are publicly readable.
4. **Identity Safety**: Administrator status must be verified against a secure source, not just an email claim.

## The "Dirty Dozen" Payloads

### 1. The "Ghost Field" Injection (Identity Spoofing)
**Target**: `feedback`
**Payload**: `{ category: "bug", rating: 5, comment: "Looks good", timestamp: "2023-10-01T12:00:00Z", isAdmin: true }`
**Expected**: `PERMISSION_DENIED` - shadow fields not allowed.

### 2. The "Self-Promotion" Attack (Privilege Escalation)
**Target**: `users/attacker_uid`
**Payload**: `{ totalXp: 100, streakDays: 1, completedLessonIds: [], level: 1, role: "admin" }`
**Expected**: `PERMISSION_DENIED` - cannot set own role.

### 3. The "Resource Poisoning" Attack (Denial of Wallet)
**Target**: `feedback`
**Payload**: `{ category: "bug", rating: 5, comment: "A".repeat(1000000), timestamp: "2023-10-01T12:00:00Z" }`
**Expected**: `PERMISSION_DENIED` - comment size limit exceeded.

### 4. The "Orphaned Feedback" Attack (Integrity Violation)
**Target**: `feedback`
**Payload**: `{ rating: 5, comment: "Missing category" }`
**Expected**: `PERMISSION_DENIED` - missing required fields.

### 5. The "Historical Revisionism" Attack (Immutability Violation)
**Target**: `users/user_uid`
**Update Payload**: `{ totalXp: 50, updatedAt: request.time }` where `existing().totalXp == 100`.
**Expected**: `PERMISSION_DENIED` - XP should (generally) only increase or stay same in specific logic, but specifically here, we should ensure certain fields aren't reverted if we had that logic. *Actually, let's focus on `createdAt` immutability.*

### 6. The "Time Traveler" Attack (Temporal Integrity)
**Target**: `feedback`
**Payload**: `{ category: "bug", rating: 5, comment: "From the future", timestamp: "2099-01-01T00:00:00Z" }`
**Expected**: `PERMISSION_DENIED` - timestamp must be `request.time`.

### 7. The "ID Poisoning" Attack
**Target**: `users/` followed by a 2KB string of junk characters.
**Expected**: `PERMISSION_DENIED` - invalid ID format/size.

### 8. The "PII Snapshot" Attack (Privacy Leak)
**Target**: `users/some_other_user_uid` (Read as non-admin authenticated user)
**Expected**: `PERMISSION_DENIED` - user A cannot read user B's progress.

### 9. The "Lesson Vandal" Attack (Unauthorized Write)
**Target**: `lessons/some_lesson` (Write as non-admin authenticated user)
**Payload**: `{ id: "1.1", title: "Hacked", content: "..." }`
**Expected**: `PERMISSION_DENIED` - non-admins cannot write to lessons.

### 10. The "Type Confusion" Attack
**Target**: `users/user_uid`
**Payload**: `{ totalXp: "100", streakDays: 1, completedLessonIds: [], level: 1 }`
**Expected**: `PERMISSION_DENIED` - `totalXp` must be a number.

### 11. The "Recursive List" Attack
**Target**: `users/user_uid`
**Payload**: `{ totalXp: 100, streakDays: 1, completedLessonIds: ["a".repeat(1000)], level: 1 }`
**Expected**: `PERMISSION_DENIED` - array elements must have size limits.

### 12. The "Update Gap" Attack (Partial Bypass)
**Target**: `lessons/some_lesson` (Update as authenticated user)
**Payload**: `{ title: "New Title" }` (without `isAdmin` or full validation)
**Expected**: `PERMISSION_DENIED`.

## Conclusion
Rules must enforce strict schema, identity ownership, role verification via database lookup, and size limits on all fields.
