using System;
using System.Text.Json.Serialization;

namespace IdentityService.Domain.Entities
{
    public class UserRole
    {
        public Guid UserId { get; private set; }
        public User User { get; private set; }

        public Guid RoleId { get; private set; }
        public Role Role { get; private set; }

        private UserRole() { }

        public UserRole(User user, Role role)
        {
            UserId = user.Id;
            User = user;
            RoleId = role.Id;
            Role = role;
        }
    }
}