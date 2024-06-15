import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from '../components/UI/Dropdown'
import { Modal, ModalOpen, ModalWindow } from '../components/UI/Modal'
import ResetPasswordForm from '../components/Containers/Forms/ResetPasswordForm'
import ProfileSettingsForm from '../components/Containers/Forms/ProfileSettingsForm'
import DeleteAccountForm from '../components/Containers/Forms/DeleteAccountForm'
import CoverModal from '../components/Modals/CoverModal'
import { useUserContext } from '../contexts/contextHooks'
import Avatar from '../components/UI/Avatar'
import { PhotoIcon } from '@heroicons/react/24/solid'

const ProfileSettings = () => {
	const { user: loggedUser } = useUserContext()
	return (
		<section className='settingsContainer'>
			<div className='flex justify-between items-center'>
				<h4 className='mt-2 mb-4 text-xl dark:text-light'>Profile Settings</h4>
				<Dropdown>
					<DropdownToggle
						btnStyles='w-6 h-6 p-4 shadow-xs border-[1px] border-light3'
						icon={<EllipsisVerticalIcon className='h-6 w-6' />}
					/>
					<DropdownMenu position='bottom'>
						<DropdownItem itemId='changePassword' closeOnClick={false}>
							<Modal>
								<ModalOpen openedModalName='changePassword'>
									<span>Change Password</span>
								</ModalOpen>
								<ModalWindow showCloseIcon={true} modalName='changePassword'>
									<h2 className='text-black3 dark:text-light mb-6'>Change Password</h2>
									<ResetPasswordForm
										buttonName='Change'
										passwordLabel='New Password'
										confirmLabel='Confirm New Password'
										showCancelBtn={true}
									/>
								</ModalWindow>
							</Modal>
						</DropdownItem>
						<DropdownItem itemId='deleteAccount' closeOnClick={false}>
							<Modal>
								<ModalOpen openedModalName='deleteAccount'>
									<span>Delete Account</span>
								</ModalOpen>
								<ModalWindow modalName='deleteAccount' modalWindowStyles='max-w-[600px]'>
									<DeleteAccountForm />
								</ModalWindow>
							</Modal>
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>

			<div className='flex flex-col relative mt-4'>
				<div className='p-4 bg-light border-[1px] border-b-0 border-lightGray dark:bg-black3 dark:border-darkGray'>
					<div className='flex items-center justify-center relative'>
						{loggedUser?.coverURL ? (
							<img src={loggedUser?.coverURL} alt='CoverImage' className='bg-cover max-w-[800px] w-full h-[200px] rounded-lg' />
						) : (
							<div className='bg-cover bg-light3  dark:bg-darkGray max-w-[800px] w-full h-[200px] rounded-t-lg'>
								<Avatar
									icon={<PhotoIcon className='h-full w-full text-gray2 dark:text-black3' />}
									avatarStyles='absolute h-16 w-16 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-none rounded-lg'
								/>
							</div>
						)}
						<CoverModal />
					</div>
				</div>
				<ProfileSettingsForm />
			</div>
		</section>
	)
}

export default ProfileSettings
