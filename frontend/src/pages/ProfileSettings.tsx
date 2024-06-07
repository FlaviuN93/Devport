import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from '../components/UI/Dropdown'
import { Modal, ModalOpen, ModalWindow } from '../components/UI/Modal'
import ResetPasswordForm from '../components/Containers/Forms/ResetPasswordForm'
import ProfileSettingsForm from '../components/Containers/Forms/ProfileSettingsForm'
import DeleteAccountForm from '../components/Containers/Forms/DeleteAccountForm'
import CoverModal from '../components/Modals/CoverModal'
import { defaultCover } from '../utils/variables'
import { useUserContext } from '../contexts/contextHooks'

const ProfileSettings = () => {
	const { user: loggedUser } = useUserContext()
	return (
		<section className='settingsContainer'>
			<div className='flex justify-between items-center'>
				<h4 className='mt-2 mb-4'>Profile Settings</h4>
				<Dropdown>
					<DropdownToggle btnStyles='w-6 h-6 p-4 shadow-xs border-light2' icon={<EllipsisVerticalIcon className='h-6 w-6' />} />
					<DropdownMenu position='bottom'>
						<DropdownItem itemId='changePassword' closeOnClick={false}>
							<Modal>
								<ModalOpen openedModalName='changePassword'>
									<span>Change Password</span>
								</ModalOpen>
								<ModalWindow showCloseIcon={true} modalName='changePassword'>
									<h2 className='mb-6'>Change Password</h2>
									<ResetPasswordForm
										buttonName='Change'
										passwordLabel='New Password'
										confirmLabel='Confirm New Password'
										formStyles='mb-4'
										buttonStyles='bg-violet text-white'
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
				<img
					className='bg-cover max-w-[800px] w-full h-[200px] rounded-t-lg'
					src={loggedUser.coverURL ? loggedUser.coverURL : defaultCover}
					alt='Cover Image'
				/>

				<CoverModal />
				<ProfileSettingsForm />
			</div>
		</section>
	)
}

export default ProfileSettings
