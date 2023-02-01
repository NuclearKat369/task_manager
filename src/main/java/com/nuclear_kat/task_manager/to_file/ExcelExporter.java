package com.nuclear_kat.task_manager.to_file;

import com.nuclear_kat.task_manager.dto.EmployeeStatusCountDto;
import com.nuclear_kat.task_manager.dto.EmployeeTasksDto;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/* Класс, отвечающий за экспорт данных о загруженности сотрудников в файл .xlsx*/
public class ExcelExporter implements FileExporter {

    private XSSFWorkbook workbook;
    private XSSFSheet sheet;
    private List<EmployeeTasksDto> employeeWorkload;

    public ExcelExporter(List<EmployeeTasksDto> employeeWorkload) {
        this.employeeWorkload = employeeWorkload;
        workbook = new XSSFWorkbook();
    }


    private void writeHeaderLine() {
        sheet = workbook.createSheet("Статистика");

        Row row = sheet.createRow(0);

        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setBold(true);
        font.setFontHeight(16);
        style.setFont(font);

        createCell(row, 0, "Фамилия", style);
        createCell(row, 1, "Имя", style);
        createCell(row, 2, "Отчество", style);
        createCell(row, 3, "Новые", style);
        createCell(row, 4, "В работе", style);
        createCell(row, 5, "Решённые", style);
        createCell(row, 6, "Завершённые", style);

    }

    private void createCell(Row row, int columnCount, Object value, CellStyle style) {
        sheet.autoSizeColumn(columnCount);
        Cell cell = row.createCell(columnCount);
        if (value instanceof Integer) {
            cell.setCellValue((Integer) value);
        } else if (value instanceof Long) {
            cell.setCellValue((Long) value);
        } else if (value instanceof Boolean) {
            cell.setCellValue((Boolean) value);
        } else {
            cell.setCellValue((String) value);
        }
        cell.setCellStyle(style);
    }

    private void writeDataLines() {
        int rowCount = 1;

        CellStyle style = workbook.createCellStyle();
        XSSFFont font = workbook.createFont();
        font.setFontHeight(14);
        style.setFont(font);

        for (EmployeeTasksDto employeeTasksDto : employeeWorkload) {
            Row row = sheet.createRow(rowCount++);
            int columnCount = 0;

            createCell(row, columnCount++, employeeTasksDto.getLastName(), style);
            createCell(row, columnCount++, employeeTasksDto.getFirstName(), style);
            createCell(row, columnCount++, employeeTasksDto.getPatronymic(), style);

            // Список - каждый элемент, равен ли ID статуса значению столбца 1, 2, 3, 4
            int k = 0;      // вспомогательный коэффициент, если k>0? , то есть добавленные в список элементы
            for (EmployeeStatusCountDto e : employeeTasksDto.getEmployeeStatusCount()) {
                for (int i = 1; i <= 4; i++) {
                    if (e.getTaskStatus().getStatusId() == i) {
                        createCell(row, columnCount++, e.getTaskCount(), style);
                        k++;
                        break;
                    } else {
                        if (e.getTaskStatus().getStatusId() > i & k == 0) {
                            columnCount++;
                        }
                    }
                }
            }
        }
    }

    public void export(HttpServletResponse response) throws IOException {
        writeHeaderLine();
        writeDataLines();

        ServletOutputStream outputStream = response.getOutputStream();
        workbook.write(outputStream);
        workbook.close();

        outputStream.close();
    }
}
