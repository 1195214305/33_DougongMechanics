/**
 * 边缘函数: 千问AI接口
 * 路径: /api/qwen
 */

export default async function handler(request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: '仅支持POST请求' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }

  try {
    const { question, context } = await request.json()

    if (!question) {
      return new Response(JSON.stringify({ error: '问题不能为空' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // 从请求头获取API Key
    const apiKey = request.headers.get('X-API-Key')
    if (!apiKey) {
      return new Response(JSON.stringify({ error: '请提供API Key' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    // 构建系统提示词
    const systemPrompt = `你是一位精通中国古代建筑力学的专家，特别擅长解释斗拱结构的力学原理。
请用通俗易懂的语言回答用户的问题，并结合具体的力学知识进行说明。
回答要简洁明了，控制在200字以内。`

    const userPrompt = context
      ? `${context}\n\n用户问题：${question}`
      : question

    // 调用千问API
    const response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'qwen-turbo',
        input: {
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
          ]
        },
        parameters: {
          max_tokens: 500,
          temperature: 0.7
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      return new Response(JSON.stringify({
        error: `千问API调用失败: ${response.status}`,
        details: errorText
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const data = await response.json()

    if (data.output && data.output.choices && data.output.choices[0]) {
      const answer = data.output.choices[0].message.content

      return new Response(JSON.stringify({ answer }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    } else {
      return new Response(JSON.stringify({ error: 'API返回格式异常' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

  } catch (error) {
    return new Response(JSON.stringify({
      error: '服务器内部错误',
      message: error.message
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
}
