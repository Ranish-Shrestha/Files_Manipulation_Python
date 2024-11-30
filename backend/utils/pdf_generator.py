from fpdf import FPDF

def generate_pdf(content, filename):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    for line in content.split("\n"):
        pdf.cell(200, 10, txt=line, ln=True)
    output_path = f"downloads/{filename}.pdf"
    pdf.output(output_path)
    return output_path
