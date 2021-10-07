const path = require("path");
const fs = require("fs").promises;
const { v1: uuidv1 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    console.table(result);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const list = await fs.readFile(contactsPath);
    const result = await JSON.parse(list).find(
      (contact) => contact.id === contactId
    );
    console.table(result);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const list = await fs.readFile(contactsPath);
    const newList = JSON.parse(list).filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(newList));
    console.table(newList);
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const list = await fs.readFile(contactsPath);
    const contacts = JSON.parse(list);
    const contactNew = { id: uuidv1(), name, email, phone };
    const newList = [contactNew, ...contacts];
    await fs.writeFile(contactsPath, JSON.stringify(newList));
    console.table(newList);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
