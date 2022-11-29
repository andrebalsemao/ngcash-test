import { BaseDatabase } from "../BaseDatabase";

class Migrations extends BaseDatabase {
  execute = async () => {
    try {
      console.log("Criando as tabelas");
      await this.createTables();
      console.log("Tabelas criadas com sucesso!");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  createTables = async () => {
    await BaseDatabase.connection.raw(`
    
      DROP TABLE IF EXISTS Users;
      DROP TABLE IF EXISTS Transactions;
      DROP TABLE IF EXISTS Accounts;
      
      
      CREATE TABLE IF NOT EXISTS Accounts (
        id VARCHAR(255) PRIMARY KEY UNIQUE,
        balance DECIMAL(15,2)  DEFAULT 100
      );
      
      CREATE TABLE IF NOT EXISTS Users (
        id VARCHAR(255) PRIMARY KEY UNIQUE,
        userName VARCHAR(255) NOT NULL,
        accountId VARCHAR(255),
        FOREIGN KEY (accountId) REFERENCES Accounts(id)
      );
      
      CREATE TABLE IF NOT EXISTS Transactions (
        id VARCHAR(255) PRIMARY KEY UNIQUE,
        value DECIMAL(15,2),
        createdAt DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
        debitedAccountId VARCHAR(255),
        creditedAccountId VARCHAR(255),
        FOREIGN KEY (debitedAccountId) REFERENCES Accounts (id),
        FOREIGN KEY (creditedAccountId) REFERENCES Accounts (id)
      );
      
      
        `);
  };
}

const migrations = new Migrations();

migrations.execute();
