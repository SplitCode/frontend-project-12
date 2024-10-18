import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';

const modals = {
  adding: AddChannelModal,
  removing: RemoveChannelModal,
  renaming: RenameChannelModal,
};

export default (modalName) => modals[modalName];
