import { useState } from "react";
import ContactForm from "./сomponents/ContactForm/ContactForm";
import Filter from "./сomponents/Filter/Filter";
import ContactList from "./сomponents/ContactList/ContactList";
import toast, { Toaster } from "react-hot-toast";
import { nanoid } from "nanoid";
import { Title, TitleContacts, Wrapper, P } from "./App.styled";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
	const [contacts, setContacts] = useLocalStorage("contacts", "");
	const [filter, setFilter] = useState("");

	const addContact = (name, number) => {
		const contact = {
			id: nanoid(),
			name,
			number,
		};
		if (
			contacts.find(
				(contact) => contact.name.toLowerCase() === name.toLowerCase()
			)
		) {
			toast.error(`${name} is already in contacts.`);
		} else if (contacts.find((contact) => contact.number === number)) {
			toast.error(`${number} is already in contacts.`);
		} else {
			setContacts((contacts) => [contact, ...contacts]);
		}
	};
	const deleteContact = (contactId) => {
		setContacts((contacts) =>
			contacts.filter((contact) => contact.id !== contactId)
		);
	};
	const changeFilter = (e) => {
		setFilter(e.currentTarget.value);
	};
	const getVisibleContacts = () => {
		return contacts.filter((contact) =>
			contact.name.toLowerCase().includes(filter.toLowerCase())
		);
	};
	return (
		<Wrapper>
			<Toaster />
			<Title>Phonebook</Title>
			<ContactForm onSubmit={addContact} />
			<TitleContacts>Contacts</TitleContacts>
			{contacts.length > 1 && <Filter value={filter} onChange={changeFilter} />}
			{contacts.length > 0 ? (
				<ContactList
					contacts={getVisibleContacts()}
					onDeleteContact={deleteContact}
				/>
			) : (
				<P>Your phonebook is empty.</P>
			)}
		</Wrapper>
	);
}
