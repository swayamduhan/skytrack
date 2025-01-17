export default function GradientButton({ label, onClick } : { label : string, onClick : ()=>void}){
    return (
        <div className="w-full col-span-4 text-lg p-2 rounded-3xl text-center text-white font-satoshi font-bold relative group overflow-hidden cursor-pointer" onClick={onClick}>
            <div className="text-black dark:text-white relative z-10 bg-white/90 dark:bg-slate-600 rounded-3xl p-[6px] -m-[5px]">{label}</div>
            <div className="inset-[0px] rounded-3xl absolute -top-[480%]" 
                style={{
                    background: 'conic-gradient(from 0deg, #A9BCF5 0%, #89ABE3 25%, #6D82D1 41%, #5359BF 55%,rgb(48, 83, 221) 75%,rgb(134, 162, 246) 95%, #A9BCF5 100%)',
                    height : "1100%",
                    animation: 'spin 2s linear infinite'
                }}>
            </div>
        </div>
    )
}