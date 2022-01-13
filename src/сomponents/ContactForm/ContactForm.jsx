import PropTypes from "prop-types";
import { useState } from "react";
import { nanoid } from "nanoid";
import { Form, Label, Input, Button } from "./ContactForm.styled";
import toast, { Toaster } from "react-hot-toast";
export default function ContactForm({ onSubmit }) {
	const [name, setName] = useState("");
	const [number, setNumber] = useState("");

	const nameInputId = nanoid();
	const numberInputId = nanoid();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		switch (name) {
			case "name":
				setName(value);
				break;
			case "number":
				setNumber(value);
				break;
			default:
				return;
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (name.trim() === "") {
			return toast.error(" Please enter name!");
		} else if (number.trim() === "") {
			return toast.error(" Please enter number!");
		}
		onSubmit(name, number);
		resetInput();
	};
	const resetInput = () => {
		setName("");
		setNumber("");
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Toaster />
			<Label htmlFor={nameInputId}>
				Name
				<Input
					type="text"
					name="name"
					id={nameInputId}
					value={name}
					onChange={handleInputChange}
					pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
					title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
					required
					placeholder="Andrei Potapov"
				/>
			</Label>
			<Label htmlFor={numberInputId}>
				Number
				<Input
					type="tel"
					name="number"
					id={numberInputId}
					value={number}
					onChange={handleInputChange}
					pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
					title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
					required
					placeholder="111-11-11"
				/>
			</Label>
			<Button type="submit">Add contact</Button>
		</Form>
	);
}

ContactForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};
