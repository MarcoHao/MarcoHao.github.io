import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Play, Pause } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [playingVideo, setPlayingVideo] = useState(null);

  // 模拟作品数据
  const projects = [
    {
      id: 1,
      title: "参数化建筑设计",
      description: "使用Python和Grasshopper创建的参数化建筑立面系统，结合机器学习优化能源效率",
      type: "architecture",
      media: "image",
      url: "https://placehold.co/800x600/1e293b/ffffff?text=Parametric+Facade",
      tags: ["Python", "Grasshopper", "AI", "Sustainability"]
    },
    {
      id: 2,
      title: "智能城市模拟器",
      description: "基于React和Three.js构建的3D城市模拟平台，集成AI交通流量预测",
      type: "programming",
      media: "video",
      url: "https://placehold.co/800x600/0f172a/ffffff?text=Smart+City+Simulator",
      tags: ["React", "Three.js", "AI", "Urban Planning"]
    },
    {
      id: 3,
      title: "生成式建筑设计",
      description: "利用GAN网络生成创新建筑形态，结合传统建筑理论进行优化",
      type: "ai",
      media: "image",
      url: "https://placehold.co/800x600/1e293b/ffffff?text=Generative+Architecture",
      tags: ["GAN", "Machine Learning", "Design", "Innovation"]
    },
    {
      id: 4,
      title: "建筑信息模型API",
      description: "为BIM软件开发的RESTful API，实现建筑数据的智能分析和可视化",
      type: "programming",
      media: "image",
      url: "https://placehold.co/800x600/0f172a/ffffff?text=BIM+API",
      tags: ["Node.js", "Express", "BIM", "Data Analysis"]
    },
    {
      id: 5,
      title: "可持续材料数据库",
      description: "AI驱动的建筑材料数据库，提供环保性能分析和成本优化建议",
      type: "ai",
      media: "video",
      url: "https://placehold.co/800x600/1e293b/ffffff?text=Sustainable+Materials",
      tags: ["Database", "AI", "Sustainability", "Materials"]
    },
    {
      id: 6,
      title: "虚拟现实建筑漫游",
      description: "基于WebVR的建筑项目虚拟漫游系统，支持实时协作和设计评审",
      type: "architecture",
      media: "image",
      url: "https://placehold.co/800x600/0f172a/ffffff?text=VR+Architecture",
      tags: ["WebVR", "3D Modeling", "Collaboration", "Visualization"]
    }
  ];

  const toggleVideo = (id) => {
    if (playingVideo === id) {
      setPlayingVideo(null);
    } else {
      setPlayingVideo(id);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'projects', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-slate-800">ArchCode</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {['home', 'projects', 'about', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors duration-200 ${
                    activeSection === item 
                      ? 'text-blue-600 font-semibold' 
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-slate-600 hover:text-slate-800 hover:bg-slate-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['home', 'projects', 'about', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-md w-full text-left capitalize"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  Where <span className="text-blue-600">Architecture</span> Meets <span className="text-purple-600">Code</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Building the future through the intersection of architectural design, 
                  programming, and artificial intelligence.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  View Projects
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all duration-200"
                >
                  Get in Touch
                </button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2 text-slate-600">
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <Mail className="w-5 h-5" />
                  <span>Email</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://placehold.co/600x700/1e293b/ffffff?text=Architectural+AI+Design" 
                  alt="Architectural AI Design" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Exploring the boundaries between architectural design, computational thinking, 
              and artificial intelligence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="group bg-slate-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  {project.media === 'image' ? (
                    <img 
                      src={project.url} 
                      alt={project.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-64 bg-slate-900 flex items-center justify-center relative overflow-hidden">
                      <img 
                        src={project.url} 
                        alt={project.title}
                        className="w-full h-full object-cover opacity-70"
                      />
                      <button 
                        onClick={() => toggleVideo(project.id)}
                        className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-all duration-300"
                      >
                        {playingVideo === project.id ? (
                          <Pause className="w-12 h-12 text-white" />
                        ) : (
                          <Play className="w-12 h-12 text-white ml-1" />
                        )}
                      </button>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.type === 'architecture' 
                        ? 'bg-blue-100 text-blue-800' 
                        : project.type === 'programming' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {project.type === 'architecture' ? 'Architecture' : 
                       project.type === 'programming' ? 'Programming' : 'AI'}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{project.title}</h3>
                  <p className="text-slate-600 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                    View Project <ExternalLink className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-slate-900">About Me</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                I'm a hybrid professional with expertise in both architecture and software development. 
                My work bridges the gap between physical spaces and digital systems, creating innovative 
                solutions that leverage the power of artificial intelligence.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                With a background in architectural design and a passion for programming, I specialize in 
                developing computational tools that enhance the design process, optimize building performance, 
                and create more sustainable built environments.
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-900">Architecture</h4>
                  <ul className="text-slate-600 space-y-1">
                    <li>• Parametric Design</li>
                    <li>• BIM Implementation</li>
                    <li>• Sustainable Design</li>
                    <li>• Urban Planning</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-slate-900">Technology</h4>
                  <ul className="text-slate-600 space-y-1">
                    <li>• Python & JavaScript</li>
                    <li>• Machine Learning</li>
                    <li>• Web Development</li>
                    <li>• 3D Visualization</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">AI</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">AI Integration</h3>
                      <p className="text-slate-600">Machine learning for design optimization</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">C</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Code Architecture</h3>
                      <p className="text-slate-600">Building scalable software systems</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">D</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Design Thinking</h3>
                      <p className="text-slate-600">Human-centered problem solving</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Let's Collaborate</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Interested in working together or have questions about my work? 
              I'd love to hear from you!
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea 
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell me about your project or ideas..."
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold">ArchCode</span>
            </div>
            <p className="text-slate-400 mb-6">
              Building the future at the intersection of architecture, code, and AI
            </p>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-800 text-slate-500 text-sm">
              © 2024 ArchCode Portfolio. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;