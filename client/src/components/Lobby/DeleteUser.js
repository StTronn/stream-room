import React from "react";

const DeleteUser = () => {
	return (
		<button className="bg-nt-red-accent hover:bg-red-500 p-2 rounded-full shadow-md flex justify-center items-center">
			<svg
				className="text-white toggle__lock w-6 h-6"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth="{2}"
					d="M6 18L18 6M6 6l12 12"
				/>
			</svg>
		</button>
	);
};

export default DeleteUser;
