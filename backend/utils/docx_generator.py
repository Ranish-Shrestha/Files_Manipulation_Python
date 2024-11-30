import docx

def generate_docx(content, filename):
    doc = docx.Document()
    for line in content.split("\n"):
        doc.add_paragraph(line)
    output_path = f"downloads/{filename}.docx"
    doc.save(output_path)
    return output_path
