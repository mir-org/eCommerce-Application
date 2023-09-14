import { Router } from '../../../router/router';
import { View } from '../../view';
import { ABOUT_US_CLASSES } from './about-us-view-types';

class AboutView extends View {
  constructor(private router: Router) {
    super('main', ABOUT_US_CLASSES.ABOUT);
    this.configureView();
  }

  private configureView(): void {
    console.log('Configure About Us View');
  }
}

export default AboutView;
