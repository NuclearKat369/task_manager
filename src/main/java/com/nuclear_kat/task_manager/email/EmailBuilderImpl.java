package com.nuclear_kat.task_manager.email;

import com.nuclear_kat.task_manager.entity.Task;
import org.springframework.stereotype.Service;

@Service
public class EmailBuilderImpl implements EmailBuilder {


    // Письмо о создании новой заявки
    public String buildCreatedTaskEmail(Task task, String link) {
        return "<div>\n" +
                "   <table>\n" +
                "       <thead>" +
                "           <tr>\n" +
                "             <th>\n" +
                "              <span>Создана новая заявка №" + task.getTaskId() + "</span>\n" +
                "             </th>\n" +
                "           </tr>\n" +
                "       </tbody>" +
                "   </table>\n" +
                "\n" +
                "  <table>\n" +
                "    <tbody>" +
                "    <tr>\n" +
                "      <td></td>\n" +
                "      <td>\n" +
                "        \n" +
                "            <p>Здравствуйте,</p>" +
                "            <p>Создана новая заявка № " + task.getTaskId() + ". </p><p> <a href=\"" + link + "\">Перейти в сервис</a> </p>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div>\n" +
                "\n" +
                "  <table>\n" +
                "    <tbody>" +
                "    <tr>\n" +
                "      <td>Тема </td>\n" +
                "      <td> " + task.getTaskName() + " </td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td>Статус </td>\n" +
                "      <td>Новая </td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td>Автор </td>\n" +
                "      <td> " +
                task.getCreatedBy().getLastName() + " " +
                task.getCreatedBy().getFirstName() + " " +
                task.getCreatedBy().getPatronymic() +
                "       </td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td>Ответственный </td>\n" +
                "      <td>Не назначен</td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td ></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>" +
                "</div>";
    }

    // Письмо об изменениях в существующей заявке
    public String buildUpdatedTaskEmail(Task task, String link) {

        String employeeInCharge = task.getEmployeeInCharge() != null
                ? (task.getEmployeeInCharge().getLastName() + " " +
                task.getEmployeeInCharge().getFirstName() + " " +
                task.getEmployeeInCharge().getPatronymic())
                : ("Не назначен");
        return "<div>\n" +
                "   <table>\n" +
                "       <thead>" +
                "           <tr>\n" +
                "             <th>\n" +
                "              <span>Изменена заявка №" + task.getTaskId() + "</span>\n" +
                "             </th>\n" +
                "           </tr>\n" +
                "       </tbody>" +
                "   </table>\n" +
                "\n" +
                "  <table>\n" +
                "    <tbody>" +
                "    <tr>\n" +
                "      <td></td>\n" +
                "      <td>\n" +
                "        \n" +
                "            <p>Здравствуйте,</p>" +
                "            <p>В заявке № " + task.getTaskId() + " есть изменения. </p><p> <a href=\"" + link + "\">Перейти в сервис</a> </p>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div>\n" +
                "\n" +
                "  <table>\n" +
                "    <tbody>" +
                "    <tr>\n" +
                "      <td>Тема </td>\n" +
                "      <td> " + task.getTaskName() + " </td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td>Статус </td>\n" +
                "      <td> " + task.getTaskStatus().getStatusName() + " </td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td>Автор </td>\n" +
                "      <td> " +
                task.getCreatedBy().getLastName() + " " +
                task.getCreatedBy().getFirstName() + " " +
                task.getCreatedBy().getPatronymic() +
                "       </td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td>Ответственный </td>\n" +
                "      <td>" + employeeInCharge + "</td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td ></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>" +
                "</div>";
    }

    // Письмо для подтверждения токена
    public String buildConfirmEmail(String name, String link) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Подтвердите адрес электронной почты</span>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Здравствуйте " + name + ",</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> Спасибо за регистрацию. Пожалуйста, перейдите по ссылке ниже для активации аккаунта: </p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\"" + link + "\">Активировать сейчас</a> </p></blockquote>\n Ссылка действительна 15 минут." +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }

    public String buildConfirmed(String email, String link) {
        return "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
                "\n" +
                "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
                "\n" +
                "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
                "        \n" +
                "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
                "          <tbody><tr>\n" +
                "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
                "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td style=\"padding-left:10px\">\n" +
                "                  \n" +
                "                    </td>\n" +
                "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px;padding-left:10px\">\n" +
                "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Адрес электронной почты успешно подтверждён</span>\n" +
                "                    </td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "              </a>\n" +
                "            </td>\n" +
                "          </tr>\n" +
                "        </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
                "      <td>\n" +
                "        \n" +
                "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
                "                  <tbody><tr>\n" +
                "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
                "                  </tr>\n" +
                "                </tbody></table>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
                "    </tr>\n" +
                "  </tbody></table>\n" +
                "\n" +
                "\n" +
                "\n" +
                "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
                "    <tbody><tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
                "        \n" +
                "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"></p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"></p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\"" + link + "\">Войти в сервис</a> </p></blockquote>\n" +
                "        \n" +
                "      </td>\n" +
                "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
                "    </tr>\n" +
                "    <tr>\n" +
                "      <td height=\"30\"><br></td>\n" +
                "    </tr>\n" +
                "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
                "\n" +
                "</div></div>";
    }
}
