package com.nuclear_kat.task_manager.to_file;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public interface FileExporter {
    void export(HttpServletResponse response) throws IOException;
}
