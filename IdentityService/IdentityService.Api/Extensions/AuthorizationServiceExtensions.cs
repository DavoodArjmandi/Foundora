namespace IdentityService.Api.Extensions
{
    public static class AuthorizationServiceExtensions
    {
        public static IServiceCollection AddAuthorizationServices(this IServiceCollection services)
        {
            services.AddAuthorization(); // Registers default ASP.NET Core authorization services.
            return services;
        }
    }
}
