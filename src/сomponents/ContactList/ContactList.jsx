import PropTypes from "prop-types";
import React from "react";
import { Ul, Li, Button, P } from "./ContactList.styled";

export default function ContactList({ contacts, onDeleteContact }) {
	return (
		<Ul>
			{contacts.map(({ id, name, number }) => (
				<Li key={id}>
					<P>
						{name}: {number}
					</P>
					<Button type="button" onClick={() => onDeleteContact(id)}>
						Delete
					</Button>
				</Li>
			))}
		</Ul>
	);
}
ContactList.propTypes = {
	contacts: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			number: PropTypes.string.isRequired,
		})
	),
	onDeleteContact: PropTypes.func.isRequired,
};
