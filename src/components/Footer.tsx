const Footer = () => {
    const year: number = new Date().getFullYear()
    
    const content = (
        <footer className="footer">
            <p>Made by bel &copy; {year}</p>
        </footer>
    )

    return content
}

export default Footer
