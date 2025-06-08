import Hero from "@/components/hero/hero"
import About from "@/components/about/about"
import CategorizedProjectsViewer from "@/components/portofolio/CategorizedProjectsViewer"
import ContactSection from "@/components/contact/ContactSection"
import CommentsSection from "@/components/comments/CommentSection"
import Footer from "@/components/footer/Footer"

export default function Dashboard(){
    return <>
        <div className="h-8"></div>
        <Hero />
        <div className="h-8"></div>
        <About />
        <CategorizedProjectsViewer />
        <div className="h-8"></div>
        <ContactSection />
        <CommentsSection />
        <Footer />
    </>
}