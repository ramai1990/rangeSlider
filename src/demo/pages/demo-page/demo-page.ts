import '../../../app/ts/jquery.range';

class DemoPage {
  constructor() {
    this.render();
  }

  public toCamelCase = (s): string => s.replace(/([-][a-z])/ig, ($1) => $1.toUpperCase()
    .replace('-', ''));

  public handleConfigInputChange(event, api) {
    const propName: string = this.toCamelCase($(event.target).attr('name'));
    const propValue: number|boolean = $(event.target).hasClass('js-slider-config__input_type_checkbox')
      ? $(event.target).is(':checked')
      : Number($(event.target).val());

    api.update({
      [propName]: propValue,
    });
  }

  public setEventListeners($form, api): void {
    $form.find('.js-slider-config__input').each((_, input) => {
      $(input).on('change', (event) => this.handleConfigInputChange(event, api));
    });
  }

  public render() {
    const updateForm = ($form, state): void => {
      const $textInputs = $form.find('.js-slider-config__input_type_text');
      $textInputs.each((_, configInput) => {
        const name: string = this.toCamelCase($(configInput).attr('name'));
        $(configInput).val(state[name]);
      });
    };

    const init = ($targets): void => {
      $targets.each((_, target) => {
        const $target = $(target);
        const $configForm = $target.closest('.js-slider-group').find('.js-slider-config');

        const sliderApi = $target.range({
          onChange(state) {
            updateForm($configForm, state);
          },
          onCreate(state) {
            updateForm($configForm, state);
          },
        }).data('api');

        this.setEventListeners($configForm, sliderApi);
      });
    };

    init($('.js-slider-group__target-input'));
  }
}

const demoPage = new DemoPage();
