import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';

import { FooterComponent } from '../app/footer/footer.component';

export default {
    title: 'Example/Footer',
    component: FooterComponent,
    decorators: [
      moduleMetadata({
        declarations: [FooterComponent],
        imports: [CommonModule],
      }),
    ],
  } as Meta;
  
  const Template: Story<FooterComponent> = (args: FooterComponent) => ({
    component: FooterComponent,
    props: args,
  });
  
  export const LoggedIn = Template.bind({});
  LoggedIn.args = {
    user: {},
  };