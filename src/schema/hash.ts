import hash from "object-hash";
import { Form, FormQuestion } from "./form";

export class Hash {
  static formQuestion(form: Form, formQuestion: FormQuestion) {
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
}
