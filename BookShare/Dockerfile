FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
WORKDIR /src
COPY ["BookShare/BookShare.csproj", "BookShare/"]
RUN dotnet restore "BookShare/BookShare.csproj"
COPY . .
WORKDIR "/src/BookShare"
RUN dotnet build "BookShare.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BookShare.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BookShare.dll"]
