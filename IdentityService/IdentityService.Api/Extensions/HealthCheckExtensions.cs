namespace IdentityService.Api.Extensions
{
    public static class HealthCheckExtensions
    {
        public static IServiceCollection AddHealthChecksServices(this IServiceCollection services)
        {
            services.AddHealthChecks(); // Registers health check services.
            return services;
        }
    }
}
