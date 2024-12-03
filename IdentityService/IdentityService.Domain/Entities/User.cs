﻿using System;

namespace IdentityService.Domain.Entities
{
    public class User
    {
        public Guid Id { get; private set; }
        public string Username { get; private set; }
        public string Email { get; private set; }
        public string PasswordHash { get; private set; }
        public List<string> Roles { get; private set; } = new();

        private User() { }

        public User(string username, string email, string passwordHash)
        {
            Id = Guid.NewGuid();
            Username = username;
            Email = email;
            PasswordHash = passwordHash;
        }

        public void AddRole(string role)
        {
            if (!Roles.Contains(role))
                Roles.Add(role);
        }

        public bool HasRole(string role) => Roles.Contains(role);
    }
}