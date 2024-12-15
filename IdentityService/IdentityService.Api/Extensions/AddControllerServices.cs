namespace IdentityService.Api.Extensions
{
    public static class ControllerServiceExtensions
    {
        public static IServiceCollection AddControllerServices(this IServiceCollection services)
        {
            services.AddControllers(); // Registers MVC controllers.
            return services;
        }
    }
}
