export const removePassword = <T extends { [key: string]: any }>(obj: T): T => {
	if (obj.hasOwnProperty('password')) delete obj.password
	return obj
}
