import AddChannelModal from './AddChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import RenameChannelModal from './RenameChannelModal';

export const MODAL_TYPES = {
  ADD: 'adding',
  REMOVE: 'removing',
  RENAME: 'renaming',
};

export const MODALS = {
  [MODAL_TYPES.ADD]: AddChannelModal,
  [MODAL_TYPES.REMOVE]: RemoveChannelModal,
  [MODAL_TYPES.RENAME]: RenameChannelModal,
};
