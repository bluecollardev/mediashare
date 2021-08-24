export interface MediaListItemProps {
  navigation?: any;
  mediaSrc?: string | null;
  title?: string;
  author?: string;
  description?: string;
  showSocial?: any | boolean;
  buttons?: any | boolean;
  content?: any;
  showActions?: boolean;
  onActionsClicked?: () => void;
}
