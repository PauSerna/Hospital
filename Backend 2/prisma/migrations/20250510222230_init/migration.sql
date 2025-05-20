BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [role_id] INT NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [User_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Role] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [Role_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Report] (
    [id] INT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [data] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Report_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Report_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Document] (
    [id] INT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [file_path] NVARCHAR(1000) NOT NULL,
    [file_type] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Document_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Document_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Event] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [date] DATETIME2 NOT NULL,
    [location] NVARCHAR(1000) NOT NULL,
    [created_at] DATETIME2 NOT NULL CONSTRAINT [Event_created_at_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Event_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Module] (
    [id] INT NOT NULL IDENTITY(1,1),
    [name] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000),
    CONSTRAINT [Module_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[UserModule] (
    [id] INT NOT NULL IDENTITY(1,1),
    [user_id] INT NOT NULL,
    [module_id] INT NOT NULL,
    CONSTRAINT [UserModule_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UserModule_user_id_module_id_key] UNIQUE NONCLUSTERED ([user_id],[module_id])
);

-- AddForeignKey
ALTER TABLE [dbo].[User] ADD CONSTRAINT [User_role_id_fkey] FOREIGN KEY ([role_id]) REFERENCES [dbo].[Role]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Report] ADD CONSTRAINT [Report_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[Document] ADD CONSTRAINT [Document_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserModule] ADD CONSTRAINT [UserModule_user_id_fkey] FOREIGN KEY ([user_id]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[UserModule] ADD CONSTRAINT [UserModule_module_id_fkey] FOREIGN KEY ([module_id]) REFERENCES [dbo].[Module]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
