import hash from "object-hash";
import { Form, FormQuestion, FormQuestionOption } from "./form";
import { MeasurementFilter, MeasurementType } from "./measurement";

export class Hash {
  static formQuestionOptions(form: Form, formQuestion: FormQuestion) {
    return hash({
      formId: form.resourceId,
      questionName: formQuestion.name,
      questionText: formQuestion.text?.description,
    });
  }

  static formQuestionText(form: Form, formQuestion: FormQuestion) {
    return hash({
      formId: form.resourceId,
      questionName: formQuestion.name,
      questionOptions: formQuestion.options?.map((option) => {
        return {
          name: option.name,
        };
      }),
    });
  }

  static formQuestionScale(form: Form, formQuestion: FormQuestion) {
    return hash({
      formId: form.resourceId,
      questionName: formQuestion.name,
      questionScale: formQuestion.scale?.map((scale) => {
        return {
          type: scale.name,
        };
      }),
    });
  }

  static questionOption(
    formQuestion: Pick<FormQuestion, "name">,
    formQuestionOption: Pick<FormQuestionOption, "name">
  ) {
    return hash({
      formName: formQuestion.name,
      formQuestionOptionName: formQuestionOption.name,
    });
  }

  static measurementFilter(
    type: MeasurementType,
    filter: Partial<MeasurementFilter>
  ) {
    return hash({
      type,
      filter,
    });
  }
}
