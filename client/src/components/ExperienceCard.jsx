import { Link } from 'react-router-dom';

export default function ExperienceCard({ exp }) {
  const price = exp.price || 899;

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      {/* Image Container - Reduced aspect ratio */}
      <div className="relative overflow-hidden aspect-[16/9]">
        <img 
          src={exp.imageUrl} 
          alt={`${exp.name} - ${exp.location}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Content - Reduced padding */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Title and Location */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h2 className="text-lg font-semibold text-gray-900 leading-tight">
            {exp.name}
          </h2>
          <span className="flex-shrink-0 bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-md font-medium whitespace-nowrap">
            {exp.location}
          </span>
        </div>

        {/* Description - Single line clamp */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-1 flex-1">
          {exp.description}
        </p>

        {/* Price and CTA - Reduced spacing */}
        <div className="flex items-center justify-between mt-auto pt-3">
          <div className="flex flex-col">
            <span className="text-xs text-gray-600">From</span>
            <span className="text-xl font-bold text-gray-900">₹{price}</span>
          </div>
          
          <Link 
            to={`/details/${exp._id}`}
            className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-lg font-semibold text-sm transition-colors"
            aria-label={`View details for ${exp.name}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
