'use client';

import Image from 'next/image';

const teamMembers = [
  {
    name: "Nafay Bin Zahid",
    title: "Product Head",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },
  {
    name: "Mohsin Khan",
    title: "Chief Executive Officer",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop"
  },
  {
    name: "Safa Rehman",
    title: "Lead HR Officer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    name: "Abrar Ul Haq",
    title: "Chief Product Officer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
  },
  {
    name: "Salman Raig",
    title: "Chief Finance Officer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  },
  {
    name: "Harris Ahmed",
    title: "Sales Lead",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },
  {
    name: "Hamima Nazeed",
    title: "Creative Director",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
  },
  {
    name: "Nauman Ali",
    title: "Quality Assurance",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop"
  }
];

function TeamPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1e3a8a] mb-4">
            Meet the Team
          </h1>
          <p className="text-lg sm:text-xl text-[#1e3a8a] max-w-2xl mx-auto">
            The team behind Zambeels mission to simplify e-commerce.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8 lg:gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-[#1e3a8a] mb-1">
                {member.name}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {member.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamPage;

