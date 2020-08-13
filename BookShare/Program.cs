using System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.FileProviders;

namespace BookShare
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateWebHostBuilder(args)
                .UseKestrel().
                UseUrls("http://0.0.0.0:" + Environment.GetEnvironmentVariable("PORT")).
                Build();
            host.Run();
            // CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args).ConfigureServices(services => 
            {
                services.Configure<MvcRazorRuntimeCompilationOptions>(options =>
                {
                    var appDirectory = Directory.GetCurrentDirectory();
                    options.FileProviders.Add(new PhysicalFileProvider(appDirectory));
                });
            }).UseStartup<Startup>();
    }
}
