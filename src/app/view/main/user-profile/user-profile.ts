import { View } from '../../view';

class UserProfileView extends View {
  constructor() {
    super('section', 'user-profile');
    this.configView();
  }

  private configView(): void {
    console.log('user-profile');
  }
}

export default UserProfileView;
