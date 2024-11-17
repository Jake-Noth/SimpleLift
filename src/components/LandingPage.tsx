


type HomeProps = {
    setSignIn: (value: boolean) => void;
};

export default function Home({ setSignIn }: HomeProps) {
    return (
        <>
            <section className="header">
                <img src="public/logo.png" id="logo"/>
                <button onClick={() => setSignIn(true)} id="signInButton">
                    Sign In
                </button>
            </section>
            
            <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', color: '#333' }}>
            <header style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1>SimplyExercise: The Easiest Way to Track Your Exercises</h1>
            <p style={{ fontSize: '1.2rem', color: '#555' }}>No Frills. No Distractions. Just Progress.</p>
            </header>
    
            <section style={{ marginBottom: '30px' }}>
            <h2>Why Choose SimplyExercise?</h2>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li>
                <strong>Streamlined Design:</strong> Track sets, reps, and weights with just a few taps.
                </li>
                <li>
                <strong>Zero Clutter:</strong> No ads, no unnecessary features—just what you need to stay consistent.
                </li>
                <li>
                <strong>Your Progress, Your Way:</strong> Visualize your growth with simple charts and summaries.
                </li>
            </ul>
            </section>
    
            <section>
            <h2>Get Started in Seconds</h2>
            <p>No long sign-ups or endless setup. Create your split and start crushing your goals.</p>
            </section>
        </div>
        </>
    );
}
