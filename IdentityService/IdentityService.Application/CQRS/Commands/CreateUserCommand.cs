﻿namespace IdentityService.Application.CQRS.Commands
{
    public class CreateUserCommand
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
    }
}
