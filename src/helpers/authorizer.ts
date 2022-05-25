import { Request } from 'express'
import { Users } from '../models/users'
import { ErrorConstants } from '../constants/errors.constants';

export const authorize = async (req: Request) => {
	try {
		const token = req?.headers?.authorization?.split(' ')[1];
		const user = await Users.findOne({ token, isDeleted: false, isBlocked: false });

		if (!user) {
			return null
		}

		return user
	} catch (error) {
		throw new Error(ErrorConstants.TOKEN_INVALID);
	}
}
