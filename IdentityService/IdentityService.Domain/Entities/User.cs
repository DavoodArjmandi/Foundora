using System;
using System.Collections.Generic;

namespace IdentityService.Domain.Entities
{
    public class User
    {
        public Guid Id { get; private set; }
        public string Username { get; private set; }
        public string Email { get; private set; }
        public string PasswordHash { get; private set; }
        public ICollection<UserRole> UserRoles { get; private set; } = new List<UserRole>();

        private User() { }

        public User(string username, string email, string passwordHash)
        {
            Id = Guid.NewGuid();
            Username = username;
            Email = email;
            PasswordHash = passwordHash;
        }

        public void AddRole(Role role)
        {
            if (UserRoles.All(ur => ur.RoleId != role.Id))
            {
                UserRoles.Add(new UserRole(this, role));
            }
        }
        public void RemoveRole(Role role)
        {
            var userRole = UserRoles.FirstOrDefault(ur => ur.RoleId == role.Id);
            if (userRole != null)
            {
                UserRoles.Remove(userRole);
            }
        }
        public bool HasRole(string roleName) =>
            UserRoles.Any(ur => ur.Role.Name.Equals(roleName, StringComparison.OrdinalIgnoreCase));
    }
}