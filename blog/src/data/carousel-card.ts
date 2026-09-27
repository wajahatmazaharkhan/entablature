export interface Post {
    id: string;
    category: string;
    title: string;
    description: string;
    author: string;
    date: string;
    views: string;
    readTime: string;
    imageUrl: string;
}

const rowOne: Post[] = [
    {
        id: 'r1-1',
        category: 'Artificial Intelligence',
        title: 'AI Ethics: Navigating the Moral Landscape of Machine Learning',
        description:
            'A critical analysis of ethical considerations in AI development and deployment across sectors.',
        author: 'Dr. Emily Tran',
        date: 'Oct 5, 2026',
        views: '45.3k',
        readTime: '10 min',
        imageUrl:
            'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=700&fit=crop',
    },
    {
        id: 'r1-2',
        category: 'Machine Learning',
        title: 'Reinforcement Learning: Strategies for Success in AI Training',
        description:
            'Exploring advanced techniques in reinforcement learning and their applications in real-world scenarios.',
        author: 'Prof. John Miller',
        date: 'Oct 5, 2026',
        views: '38.1k',
        readTime: '10 min',
        imageUrl:
            'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&h=700&fit=crop',
    },
    {
        id: 'r1-3',
        category: 'Robotics',
        title: 'Humanoid Robots: From Lab Prototype to Factory Floor',
        description:
            'How mechanical design and control systems are converging to make general-purpose robots viable.',
        author: 'Dr. Laura Simmons',
        date: 'Oct 12, 2026',
        views: '29.7k',
        readTime: '8 min',
        imageUrl:
            'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=700&fit=crop',
    },
    {
        id: 'r1-4',
        category: 'Cybersecurity',
        title: 'Defending Neural Networks Against Adversarial Attacks',
        description:
            'A survey of the emerging arms race between model robustness research and adversarial exploitation.',
        author: 'Mr. David Chen',
        date: 'Oct 18, 2026',
        views: '22.4k',
        readTime: '12 min',
        imageUrl:
            'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=700&fit=crop',
    },
    {
        id: 'r1-5',
        category: 'Quantum Computing',
        title: 'Quantum Advantage: Separating Hype from Hardware Reality',
        description:
            'What today\u2019s noisy intermediate-scale quantum devices can and cannot do for real workloads.',
        author: 'Dr. Amara Osei',
        date: 'Oct 24, 2026',
        views: '17.9k',
        readTime: '9 min',
        imageUrl:
            'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=700&fit=crop',
    },
    {
        id: 'r1-6',
        category: 'Digital Sovereignty',
        title: 'Rethinking Digital Sovereignty in an Age of Intelligent Systems',
        description:
            'Why national data policy and compute infrastructure are becoming inseparable questions.',
        author: 'Sam Altman',
        date: 'Aug 18, 2026',
        views: '51.2k',
        readTime: '11 min',
        imageUrl:
            'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=600&h=700&fit=crop',
    },
    {
        id: 'r1-7',
        category: 'Cloud Infrastructure',
        title: 'Scaling Inference: Lessons from Serving Billions of Requests',
        description:
            'Engineering trade-offs behind low-latency model serving at global scale.',
        author: 'Priya Nair',
        date: 'Nov 2, 2026',
        views: '19.6k',
        readTime: '7 min',
        imageUrl:
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=700&fit=crop',
    },
    {
        id: 'r1-8',
        category: 'Neuroscience & AI',
        title: 'What Cortical Circuits Teach Us About Model Architecture',
        description:
            'Drawing parallels between biological learning rules and modern network design.',
        author: 'Dr. Henrik Voss',
        date: 'Nov 9, 2026',
        views: '14.3k',
        readTime: '13 min',
        imageUrl:
            'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=700&fit=crop',
    },
];

const rowTwo: Post[] = [
    {
        id: 'r2-1',
        category: 'Building Trust',
        title: 'Building Trust in AI: Strategies for Ethical Development',
        description:
            'Practical frameworks teams use to align model behavior with organizational values.',
        author: 'Dr. Emily Chen',
        date: 'Oct 15, 2026',
        views: '33.8k',
        readTime: '10 min',
        imageUrl:
            'https://images.unsplash.com/photo-1694903089438-bf28d4697d9a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJ1c3QlMjBpbiUyMGFpfGVufDB8fDB8fHww',
    },
    {
        id: 'r2-2',
        category: 'Metaverse',
        title: 'Navigating the Metaverse: Opportunities and Challenges',
        description:
            'A look at persistent virtual worlds and the interaction models that will define them.',
        author: 'Carlos Mendes',
        date: 'Nov 10, 2026',
        views: '25.1k',
        readTime: '9 min',
        imageUrl:
            'https://images.unsplash.com/photo-1637664067109-a6a00840d894?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 'r2-3',
        category: 'Data Privacy',
        title: 'Differential Privacy in Practice: What Actually Ships',
        description:
            'Comparing the theoretical guarantees of privacy-preserving ML with production deployments.',
        author: 'Dr. Fatima Al-Sayed',
        date: 'Oct 21, 2026',
        views: '16.5k',
        readTime: '8 min',
        imageUrl:
            'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=700&fit=crop',
    },
    {
        id: 'r2-4',
        category: 'Autonomous Systems',
        title: 'Edge Cases: Why Self-Driving Still Struggles With the Unusual',
        description:
            'Long-tail scenarios remain the hardest unsolved problem in autonomous perception.',
        author: 'Marcus Webb',
        date: 'Oct 28, 2026',
        views: '41.7k',
        readTime: '11 min',
        imageUrl:
            'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=700&fit=crop',
    },
    {
        id: 'r2-5',
        category: 'FinTech',
        title: 'Algorithmic Underwriting and the Fairness Trade-off',
        description:
            'Balancing predictive accuracy with regulatory fairness constraints in lending models.',
        author: 'Ines Duarte',
        date: 'Nov 4, 2026',
        views: '12.9k',
        readTime: '9 min',
        imageUrl:
            'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=700&fit=crop',
    },
    {
        id: 'r2-6',
        category: 'Climate Tech',
        title: 'Forecasting Extreme Weather With Physics-Informed Models',
        description:
            'How hybrid simulation and learning-based approaches are improving lead time on storm prediction.',
        author: 'Dr. Wei Zhang',
        date: 'Nov 12, 2026',
        views: '20.3k',
        readTime: '12 min',
        imageUrl:
            'https://images.unsplash.com/photo-1561484930-998b6a7b22e8?w=600&h=700&fit=crop',
    },
    {
        id: 'r2-7',
        category: 'Space Tech',
        title: 'Onboard Autonomy: Teaching Satellites to Decide for Themselves',
        description:
            'Compute constraints in orbit are reshaping how mission-critical inference gets designed.',
        author: 'Dr. Naomi Patel',
        date: 'Nov 18, 2026',
        views: '9.8k',
        readTime: '7 min',
        imageUrl:
            'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=700&fit=crop',
    },
    {
        id: 'r2-8',
        category: 'Biotech',
        title: 'Protein Folding Models Are Rewriting Drug Discovery Timelines',
        description:
            'What structural prediction accuracy actually unlocks for wet-lab research pipelines.',
        author: 'Dr. Oliver Bennett',
        date: 'Nov 22, 2026',
        views: '27.6k',
        readTime: '10 min',
        imageUrl:
            'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=700&fit=crop',
    },
];

export { rowOne, rowTwo };
