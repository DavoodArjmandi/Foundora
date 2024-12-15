using IdentityService.Api.Extensions;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .WriteTo.Console()
    .WriteTo.File("logs/log-.txt", rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog();

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddCorsPolicies(builder.Configuration);
builder.Services.AddRateLimiting(builder.Configuration);
builder.Services.AddAuthorizationServices();
builder.Services.AddJwtSettings(builder.Configuration);
builder.Services.AddHealthChecksServices();
builder.Services.AddSwaggerServices();
builder.Services.AddControllerServices();


var app = builder.Build();

app.UseMiddlewareConfigurations(); 
app.Run();