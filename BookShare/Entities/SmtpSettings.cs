using System;
// using System.Net.Mail;
// using Microsoft.Extensions.DependencyInjection;
// using RazorEngine.Templating;
// using Microsoft.AspNetCore.Mvc.Razor;
// using Microsoft.AspNetCore.Mvc.Rendering;
// using Microsoft.AspNetCore.Mvc.ViewFeatures;
// using Microsoft.AspNetCore.Mvc.ModelBinding;
// using Microsoft.AspNetCore.Mvc.ViewEngines;
// using Microsoft.AspNetCore.Mvc.Abstractions;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.AspNetCore.Http;
// using Microsoft.AspNetCore.Routing;
// using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
// using MimeKit.Text;
// using RazorEngine;
// using System.Net;
// using BookShare;
// using BookShare.Entities;

namespace BookShare.Entities
{
    public class SmtpSettings
    {
        public string Server { get; set; }
        public int Port { get; set;}
        public string SenderName { get; set; }
        public string SenderEmail { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public interface IMailer
    {
        Task SendEmailAsync(BookShare.Models.EmailTemplate email);
    }

namespace Templates
{
    public class Mailer : IMailer
    {
        private readonly SmtpSettings _smtpSettings;
        private readonly IWebHostEnvironment _env;
        private readonly RazorViewToStringRenderer _renderer;

        public Mailer(IOptions<SmtpSettings> smtpSettings, IWebHostEnvironment env, RazorViewToStringRenderer renderer)
        {
            _smtpSettings = smtpSettings.Value;
            _env = env;
            _renderer = renderer;
        }
        public async Task SendEmailAsync(BookShare.Models.EmailTemplate email)
        {
            try
            {       
                var testContent = "";        
                switch (email.Switch) {
                    case "request":
                        testContent = _renderer.RenderViewToString("BookRequest", email).GetAwaiter().GetResult();
                        break;
                    case "forgotPassword":
                        testContent = _renderer.RenderViewToString("PasswordRequest", email).GetAwaiter().GetResult();
                        break;
                }
               
                var message = new MimeMessage();
                message.To.Add(new MailboxAddress(_smtpSettings.SenderName, _smtpSettings.SenderEmail));
                message.From.Add(new MailboxAddress(email.Username, email.Email));
                message.Subject = "New Book Request";
                var builder = new BodyBuilder();
                builder.HtmlBody = testContent;
                message.Body = builder.ToMessageBody();

                using (var client = new SmtpClient())
                {
                    client.ServerCertificateValidationCallback = (s, c, h, e) => true;

                    if (_env.IsDevelopment())
                    {
                        await client.ConnectAsync(_smtpSettings.Server, _smtpSettings.Port, SecureSocketOptions.Auto);
                    }
                    else
                    {
                        await client.ConnectAsync(_smtpSettings.Server);
                    }

                    await client.AuthenticateAsync(_smtpSettings.Username, _smtpSettings.Password);
                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                }
            }
            catch (Exception e)
            {
                throw new InvalidOperationException(e.Message);
            }
            await Task.CompletedTask;
        }
    }
}
}