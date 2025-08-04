@extends('layouts.app')
@section('title', 'Dashboard')
@section('content')
<div class="p-6 bg-gray-50 min-h-screen font-sans">
  <!-- Header -->
  <div class="flex items-center justify-between mb-6">
    <div>
      <h1 class="text-2xl font-semibold text-gray-800">Dashboard</h1>
      <p class="text-sm text-gray-500">Overview of your customer support activities</p>
    </div>
    <div class="flex items-center gap-3">
      <select class="border rounded px-3 py-1 text-sm text-gray-700 focus:outline-none focus:ring">
        <option>Today</option>
        <option>This Week</option>
        <option>This Month</option>
      </select>
      <x-button><i class="fas fa-plus text-sm"></i> Export Report</x-button>
    </div>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    <!-- Card 1 -->
    <div class="bg-white rounded-lg shadow-sm p-4">
      <div class="text-sm text-gray-500">Total Conversations</div>
      <div class="text-xl font-bold text-gray-800">143 <span class="text-green-500 text-sm">▲ 12.3%</span></div>
      <div class="text-xs text-gray-400">vs previous period</div>
    </div>

    <!-- Card 2 -->
    <div class="bg-white rounded-lg shadow-sm p-4">
      <div class="text-sm text-gray-500">CSAT Score</div>
      <div class="text-xl font-bold text-gray-800">4.8 <span class="text-green-500 text-sm">▲ 0.3</span></div>
      <div class="text-xs text-gray-400">out of 5.0</div>
    </div>

    <!-- Card 3 -->
    <div class="bg-white rounded-lg shadow-sm p-4">
      <div class="text-sm text-gray-500">Response Time</div>
      <div class="text-xl font-bold text-gray-800">5.2m <span class="text-red-500 text-sm">▼ 8.7%</span></div>
      <div class="text-xs text-gray-400">average first response</div>
    </div>

    <!-- Card 4 -->
    <div class="bg-white rounded-lg shadow-sm p-4">
      <div class="text-sm text-gray-500">Conversion Rate</div>
      <div class="text-xl font-bold text-gray-800">18.5% <span class="text-green-500 text-sm">▲ 2.1%</span></div>
      <div class="text-xs text-gray-400">chat to order</div>
    </div>

    <!-- Card 5 -->
    <div class="bg-white rounded-lg shadow-sm p-4">
      <div class="text-sm text-gray-500">Resolution Rate</div>
      <div class="text-xl font-bold text-gray-800">92% <span class="text-green-500 text-sm">▲ 4.1%</span></div>
      <div class="text-xs text-gray-400">first contact resolution</div>
    </div>
  </div>

  <!-- charts -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
    
    <!-- Conversation Activity -->
    <div class="bg-white rounded-xl shadow p-5">
      <div class="flex items-center justify-between mb-3">
        <h2 class="text-gray-700 font-semibold">Conversation Activity</h2>
        <div class="flex space-x-4 text-sm">
          <div class="flex items-center space-x-1 text-gray-700"><span class="w-3 h-3 bg-gray-800 rounded-full"></span> <span>Received</span></div>
          <div class="flex items-center space-x-1 text-gray-500"><span class="w-3 h-3 bg-gray-400 rounded-full"></span> <span>Resolved</span></div>
        </div>
      </div>
      <div id="chartOne" class="w-full"></div>
    </div>

    <!-- Conversations by Channel -->
    <div class="bg-white rounded-xl shadow p-5">
      <h2 class="text-gray-700 font-semibold mb-3">Conversations by Channel</h2>
      <div id="donutChart" class="w-full flex justify-center"></div>
      <div class="flex justify-around mt-4 text-sm text-gray-700">
        <div class="flex items-center space-x-2"><span class="w-3 h-3 bg-gray-800 rounded-full"></span> <span>WhatsApp (45%)</span></div>
        <div class="flex items-center space-x-2"><span class="w-3 h-3 bg-gray-500 rounded-full"></span> <span>Instagram (35%)</span></div>
        <div class="flex items-center space-x-2"><span class="w-3 h-3 bg-gray-300 rounded-full"></span> <span>Facebook (20%)</span></div>
      </div>
    </div>
  </div>

  <div class="bg-white shadow rounded-lg overflow-hidden mt-4">
  <div class="flex items-center justify-between px-6 py-4 border-b">
    <h2 class="text-lg font-semibold text-gray-800">Recent Conversations</h2>
    <a href="#" class="text-sm font-medium text-blue-600 hover:underline">View All</a>
  </div>

  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase">
        <tr>
          <th class="px-6 py-3">Customer</th>
          <th class="px-6 py-3">Channel</th>
          <th class="px-6 py-3">Subject</th>
          <th class="px-6 py-3">Status</th>
          <th class="px-6 py-3">Assigned To</th>
          <th class="px-6 py-3">Last Activity</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 text-sm text-gray-700">
        <!-- Row 1 -->
        <tr>
          <td class="px-6 py-4 flex items-center gap-3">
            <img class="h-8 w-8 rounded-full" src="https://i.pravatar.cc/32?u=1" alt="Avatar">
            <div>
              <div class="font-medium">Sarah Johnson</div>
              <div class="text-gray-400 text-xs">sarah.j@example.com</div>
            </div>
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center gap-1">
              <img src="{{ asset('system/images/icons/whatsapp.png') }}" class="h-4 w-4" />
              <span>WhatsApp</span>
            </div>
          </td>
          <td class="px-6 py-4">Order shipping status</td>
          <td class="px-6 py-4">
            <span class="inline-flex items-center rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">In Progress</span>
          </td>
          <td class="px-6 py-4 flex items-center gap-2">
            <img class="h-6 w-6 rounded-full" src="https://i.pravatar.cc/32?u=alex" alt="Alex">
            <span>Alex Morgan</span>
          </td>
          <td class="px-6 py-4 text-sm text-gray-500">12 minutes ago</td>
        </tr>

        <!-- Row 2 -->
        <tr>
          <td class="px-6 py-4 flex items-center gap-3">
            <img class="h-8 w-8 rounded-full" src="https://i.pravatar.cc/32?u=2" alt="Avatar">
            <div>
              <div class="font-medium">Michael Brown</div>
              <div class="text-gray-400 text-xs">m.brown@example.com</div>
            </div>
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center gap-1">
              <img src="{{ asset('system/images/icons/instagram.png') }}" class="h-4 w-4" alt="Instagram">
              <span>Instagram</span>
            </div>
          </td>
          <td class="px-6 py-4">Product information request</td>
          <td class="px-6 py-4">
            <span class="inline-flex items-center rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">Resolved</span>
          </td>
          <td class="px-6 py-4 flex items-center gap-2">
            <img class="h-6 w-6 rounded-full" src="https://i.pravatar.cc/32?u=jessica" alt="Jessica">
            <span>Jessica Lee</span>
          </td>
          <td class="px-6 py-4 text-sm text-gray-500">35 minutes ago</td>
        </tr>

        <!-- Row 3 -->
        <tr>
          <td class="px-6 py-4 flex items-center gap-3">
            <img class="h-8 w-8 rounded-full" src="https://i.pravatar.cc/32?u=3" alt="Avatar">
            <div>
              <div class="font-medium">David Lee</div>
              <div class="text-gray-400 text-xs">david.l@example.com</div>
            </div>
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center gap-1">
              <img src="{{ asset('system/images/icons/facebook.png') }}" class="h-4 w-4" alt="Facebook">
              <span>Facebook</span>
            </div>
          </td>
          <td class="px-6 py-4">Refund request</td>
          <td class="px-6 py-4">
            <span class="inline-flex items-center rounded bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">Escalated</span>
          </td>
          <td class="px-6 py-4 flex items-center gap-2">
            <img class="h-6 w-6 rounded-full" src="https://i.pravatar.cc/32?u=robert" alt="Robert">
            <span>Robert Chen</span>
          </td>
          <td class="px-6 py-4 text-sm text-gray-500">1 hour ago</td>
        </tr>

        <!-- Row 4 -->
        <tr>
          <td class="px-6 py-4 flex items-center gap-3">
            <img class="h-8 w-8 rounded-full" src="https://i.pravatar.cc/32?u=4" alt="Avatar">
            <div>
              <div class="font-medium">Emily Wilson</div>
              <div class="text-gray-400 text-xs">e.wilson@example.com</div>
            </div>
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center gap-1">
              <img src="{{ asset('system/images/icons/whatsapp.png') }}" class="h-4 w-4" alt="WhatsApp">
              <span>WhatsApp</span>
            </div>
          </td>
          <td class="px-6 py-4">International shipping inquiry</td>
          <td class="px-6 py-4">
            <span class="inline-flex items-center rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">New</span>
          </td>
          <td class="px-6 py-4 text-sm text-gray-500">Unassigned</td>
          <td class="px-6 py-4 text-sm text-gray-500">3 hours ago</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<!-- Team Performance Section -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
    <!-- Team Performance -->
    <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Team Performance</h2>
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <img class="h-8 w-8 rounded-full" src="https://i.pravatar.cc/32?u=alex" alt="Alex Morgan">
                    <div>
                        <div class="font-medium">Alex Morgan</div>
                        <div class="text-sm text-gray-500">CSAT: 4.8</div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="font-medium">45 conv.</div>
                    <div class="h-2 w-24 bg-gray-200 rounded-full mt-1">
                        <div class="h-2 w-20 bg-blue-500 rounded-full"></div>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <img class="h-8 w-8 rounded-full" src="https://i.pravatar.cc/32?u=jessica" alt="Jessica Lee">
                    <div>
                        <div class="font-medium">Jessica Lee</div>
                        <div class="text-sm text-gray-500">CSAT: 4.7</div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="font-medium">38 conv.</div>
                    <div class="h-2 w-24 bg-gray-200 rounded-full mt-1">
                        <div class="h-2 w-16 bg-blue-500 rounded-full"></div>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <img class="h-8 w-8 rounded-full" src="https://i.pravatar.cc/32?u=robert" alt="Robert Chen">
                    <div>
                        <div class="font-medium">Robert Chen</div>
                        <div class="text-sm text-gray-500">CSAT: 4.9</div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="font-medium">32 conv.</div>
                    <div class="h-2 w-24 bg-gray-200 rounded-full mt-1">
                        <div class="h-2 w-14 bg-blue-500 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Support Effectiveness -->
    <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">Support Effectiveness</h2>
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i class="fas fa-bolt text-blue-600"></i>
                    </div>
                    <span class="text-sm text-gray-600">Avg Handle Time</span>
                </div>
                <div class="text-right">
                    <div class="font-medium">12.4m</div>
                    <div class="text-xs text-gray-500">Per conversation</div>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                        <i class="fas fa-arrow-up text-red-600"></i>
                    </div>
                    <span class="text-sm text-gray-600">Escalation Rate</span>
                </div>
                <div class="text-right">
                    <div class="font-medium">8.2%</div>
                    <div class="text-xs text-gray-500">To senior agents</div>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <i class="fas fa-user-check text-green-600"></i>
                    </div>
                    <span class="text-sm text-gray-600">Agent Utilization</span>
                </div>
                <div class="text-right">
                    <div class="font-medium">78%</div>
                    <div class="text-xs text-gray-500">Active time ratio</div>
                </div>
            </div>
        </div>
    </div>

    <!-- AI Assistance Overview -->
    <div class="bg-white shadow rounded-lg p-6">
        <h2 class="text-lg font-semibold text-gray-800 mb-4">AI Assistance Overview</h2>
        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <i class="fas fa-robot text-purple-600"></i>
                    </div>
                    <span class="text-sm text-gray-600">AI-Suggested Responses</span>
                </div>
                <div class="text-right">
                    <div class="font-medium">324</div>
                    <div class="text-xs text-gray-500">Responses generated by AI</div>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                        <i class="fas fa-check text-yellow-600"></i>
                    </div>
                    <span class="text-sm text-gray-600">Used Without Edits</span>
                </div>
                <div class="text-right">
                    <div class="font-medium">187</div>
                    <div class="text-xs text-gray-500">AI responses used as-is</div>
                </div>
            </div>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <i class="fas fa-clock text-indigo-600"></i>
                    </div>
                    <span class="text-sm text-gray-600">Time Saved</span>
                </div>
                <div class="text-right">
                    <div class="font-medium">14.2h</div>
                    <div class="text-xs text-gray-500">Estimated agent time saved</div>
                </div>
            </div>
        </div>
    </div>
</div>

</div>
@endsection