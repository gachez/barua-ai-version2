const stats = [

    { name: 'Saved emails', value: '3' },
    { name: 'Saved offers', value: '0' },
    { name: 'Credits', value: JSON.parse(localStorage.getItem('user'))?.creditsAvailable },
    { name: 'Plan', value: 'Basic' },
  ]
  
  export default function Stats() {
    return (
      <div className="bg-gray-900">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
                <p className="text-sm font-medium leading-6 text-gray-400">{stat.name}</p>
                <p className="mt-2 flex items-baseline gap-x-2">
                  <span className="text-4xl font-semibold tracking-tight text-white">{stat.value}</span>
                  {stat.unit ? <span className="text-sm text-gray-400">{stat.unit}</span> : null}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  