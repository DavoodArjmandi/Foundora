﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace IdentityService.Domain.Entities
{
    public class Role
    {
        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public ICollection<UserRole> UserRoles { get; private set; } = new List<UserRole>();

        private Role() { }

        public Role(string name)
        {
            Id = Guid.NewGuid();
            Name = name;
        }
    }
}